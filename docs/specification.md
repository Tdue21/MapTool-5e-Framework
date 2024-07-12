# Dungeon & Dragons 5e MapTool Framework

## Introduction
This document contains the specification of a D&D 5E Framework for MapTools. It will contain a diverse set of features. 

### Technologies
Most of the framework will consist of separate add-on libraries, to further modularity.
As much code as possible will be written in TypeScript, and of course MTScript where necessary. 
Html5, Sass and Vue will be used for UI. 

## Libraries
The framework will be divided into several add-on libraries, in order to further easier updating and expansions. 

This will also result in dependencies between two or more libraries, so an easy way of managing this needs to be implemented. 

Each library should be as self-contained as possible, even at the cost of duplicated code. Common code should be kept in a common library though. 

## Planned Libraries
* Combat Tracker
* Map Pins
* Bestiary
* Spell Compendium

## Combat Tracker
* Add PCs and NPCs to list
* Group NPCs
* Set initiatives or roll per group
* Easy health management
* Round/turn management
* 
