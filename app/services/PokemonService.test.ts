import { describe, it, expect, beforeEach } from "vitest";
import { PokemonService } from "./PokemonService";
import { PokeApiClient } from "./PokeApiClient";
import { Pokemon } from "./pokemon";

describe("PokemonService", () => {
  let pokemonService: PokemonService;
  let mockPokeApiClient: PokeApiClient;

  beforeEach(() => {
    mockPokeApiClient = {
      getPokemonList: async () => [
        { id: 1, name: "Bulbasaur", sprite: "bulbasaur.png", types: ["Grass"] },
        { id: 2, name: "Charmander", sprite: "charmander.png", types: ["Fire"] },
      ],
    };
    pokemonService = new PokemonService(mockPokeApiClient);
  });

  it("should fetch the Pokemon list from the API client", async () => {
    // When
    const pokemonList = await pokemonService.getPokemonList();

    // Then
    expect(pokemonList).toEqual([
      { id: 1, name: "Bulbasaur", sprite: "bulbasaur.png", types: ["Grass"] },
      { id: 2, name: "Charmander", sprite: "charmander.png", types: ["Fire"] },
    ]);
  });

  it("should return an empty team for a new user", () => {
    // Given
    const userId = "user1";

    // When
    const team = pokemonService.getUserTeam(userId);

    // Then
    expect(team).toEqual([]);
  });

  it("should add a Pokemon to a user's team", () => {
    // Given
    const userId = "user1";
    const pikachu: Pokemon = {
      id: 25,
      name: "Pikachu",
      sprite: "pikachu.png",
      types: ["Electric"],
    };

    // When
    const added = pokemonService.togglePokemonInTeam(userId, pikachu);

    // Then
    expect(added).toBe(true);
    expect(pokemonService.getUserTeam(userId)).toEqual([pikachu]);
  });

  it("should remove a Pokemon from a user's team if it is already in the team", () => {
    // Given
    const userId = "user1";
    const pikachu: Pokemon = {
      id: 25,
      name: "Pikachu",
      sprite: "pikachu.png",
      types: ["Electric"],
    };

    pokemonService.togglePokemonInTeam(userId, pikachu); // Add

    // When
    const removed = pokemonService.togglePokemonInTeam(userId, pikachu); // Remove

    // Then
    expect(removed).toBe(true);
    expect(pokemonService.getUserTeam(userId)).toEqual([]);
  });

  it("should not add more than 6 Pokemon to a user's team", () => {
    // Given
    const userId = "user1";

    for (let i = 1; i <= 6; i++) {
      pokemonService.togglePokemonInTeam(userId, {
        id: i,
        name: `Pokemon${i}`,
        sprite: `pokemon${i}.png`,
        types: ["Normal"],
      });
    }

    // When
    const extraPokemon: Pokemon = {
      id: 7,
      name: "ExtraPokemon",
      sprite: "extrapokemon.png",
      types: ["Normal"],
    };
    const added = pokemonService.togglePokemonInTeam(userId, extraPokemon);

    // Then
    expect(added).toBe(false);
    expect(pokemonService.getUserTeam(userId).length).toBe(6);
  });

  it("should clear a user's team", () => {
    // Given
    const userId = "user1";
    pokemonService.togglePokemonInTeam(userId, {
      id: 25,
      name: "Pikachu",
      sprite: "pikachu.png",
      types: ["Electric"],
    });

    // When
    pokemonService.clearTeam(userId);

    // Then
    expect(pokemonService.getUserTeam(userId)).toEqual([]);
  });
});
