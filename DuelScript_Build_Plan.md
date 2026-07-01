# DuelScript --- Build Plan (Claude Code)

## 0. Project Overview

**Name:** DuelScript\
**Type:** Web app (no accounts)\
**Purpose:**\
A Yu-Gi-Oh! deck builder + combo scripting tool that lets users build
decks and visually/script combo lines, then export/import them as JSON
files.

------------------------------------------------------------------------

## 1. Core Philosophy (IMPORTANT)

-   ❌ No user accounts
-   ❌ No backend required (initial version)
-   ❌ No game rule validation (users are responsible for legality)
-   ✅ Everything works locally in browser
-   ✅ Data is saved via JSON export/import
-   ✅ Card data fetched from external API (YGOPRODeck)

------------------------------------------------------------------------

## 2. Tech Stack

-   Next.js (App Router)
-   React
-   TypeScript
-   Tailwind CSS
-   shadcn/ui (UI components)
-   Zustand (state management)
-   Framer Motion (optional animations)
-   dnd-kit (optional drag & drop)
-   YGOPRODeck API (card database)

------------------------------------------------------------------------

## 3. App Structure

### Pages

-   `/` → Home dashboard
-   `/decks` → Deck list
-   `/deck/[id]` → Deck builder
-   `/combos` → Combo list
-   `/combo/[id]` → Combo editor
-   `/cards` → Card database search

------------------------------------------------------------------------

## 4. Core Features

# 4.1 Card Database (Foundation)

### Requirements

-   Search cards by name
-   Filter:
    -   Monster / Spell / Trap
-   Display:
    -   Card image
    -   Name
    -   Type
-   Fetch from YGOPRODeck API

------------------------------------------------------------------------

# 4.2 Deck Builder

### Deck Structure

-   Main Deck: 40--60 cards
-   Extra Deck: 0--15 cards
-   Side Deck: 0--15 cards

### Features

-   Add/remove cards
-   Search card database
-   Filter by type
-   Show deck counts live
-   Save/load deck locally (browser storage)
-   Export deck (JSON download)
-   Import deck (JSON upload)

### Deck JSON Format

{ "version": 1, "name": "Deck Name", "main": \[{ "id": 12345, "qty": 3
}\], "extra": \[{ "id": 11111, "qty": 1 }\], "side": \[\] }

------------------------------------------------------------------------

# 4.3 Combo System (Script Editor)

## Core Concept

A combo is a sequence of steps, not a simulation.

------------------------------------------------------------------------

## Combo Data Structure

{ "version": 1, "name": "Combo Name", "deckId": "optional",
"startingHand": \[{ "id": 12345 }\], "steps": \[ { "action": "Normal
Summon", "cardId": 12345, "from": "Hand", "to": "Monster Zone" } \] }

------------------------------------------------------------------------

## Zones

-   Hand
-   Deck
-   Monster Zone
-   Spell/Trap Zone
-   Graveyard
-   Banished
-   Extra Deck

------------------------------------------------------------------------

## Actions

-   Activate
-   Normal Summon
-   Special Summon
-   Set
-   Move
-   Chain
-   End Chain
-   Draw
-   Search
-   Discard
-   Shuffle
-   Destroy
-   Tribute
-   Reveal
-   Custom Action

------------------------------------------------------------------------

## Replay System

-   Play / Pause / Next / Prev
-   Step-by-step execution of recorded actions

------------------------------------------------------------------------

## Save System

-   JSON export/import for combos

------------------------------------------------------------------------

## 5. Non-Goals

-   No accounts
-   No backend
-   No rules engine
-   No legality validation
-   No multiplayer
