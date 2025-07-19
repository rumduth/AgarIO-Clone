# Agar.io Clone 🎮

A real-time multiplayer Agar.io clone built with Node.js, Express, and Socket.io. Players control circular cells, absorb orbs to grow, and compete against other players in a shared world.

![Agar.io Clone](public/images/starfield.jpg)

## 🚀 Features

- **Real-time Multiplayer**: Multiple players can join and play simultaneously
- **Mouse-controlled Movement**: Smooth player movement following mouse cursor
- **Orb Collection System**: Absorb orbs to grow your character and increase score
- **Player vs Player Combat**: Larger players can absorb smaller ones
- **Live Leaderboard**: Real-time scoring and player rankings
- **Collision Detection**: Advanced collision system for orbs and players
- **Responsive UI**: Bootstrap-powered interface with modals and game stats
- **World Boundaries**: Contained game world with boundary detection

## 🛠️ Tech Stack

**Backend:**

- Node.js
- Express.js
- Socket.io (WebSocket communication)

**Frontend:**

- HTML5 Canvas (game rendering)
- Vanilla JavaScript
- Bootstrap 5 (UI components)
- CSS3

**Architecture:**

- Object-oriented design with ES6 classes
- Modular file structure
- Real-time client-server synchronization

## 📁 Project Structure

```
Agar IO/
├── server.js                 # Main server setup
├── index.js                  # Entry point
├── mouseLogic.js             # Mouse movement logic
├── package.json              # Dependencies
├── public/                   # Client-side files
│   ├── index.html           # Main HTML file
│   ├── canvasStuff.js       # Canvas rendering logic
│   ├── socketStuff.js       # Client-side socket handling
│   ├── uiStuff.js           # UI interactions and modals
│   ├── styles.css           # Custom styles
│   └── images/              # Game assets
├── socketStuff/             # Server-side game logic
│   ├── socketMain.js        # Main socket event handlers
│   ├── checkCollisions.js   # Collision detection system
│   └── classes/             # Game object classes
│       ├── Player.js        # Player class
│       ├── PlayerData.js    # Player data management
│       ├── PlayerConfig.js  # Player configuration
│       └── Orb.js          # Orb class
└── expressStuff/            # Express configuration
    └── expressMain.js       # Express setup
```

## 🎯 Game Mechanics

### Movement System

- Players move by moving their mouse cursor
- Movement vectors are calculated based on mouse position relative to canvas center
- Smooth directional movement with configurable speed

### Growth & Scoring

- Collect orbs scattered throughout the game world
- Each orb increases player size and score
- Larger players move slightly slower

### Player Combat

- Larger players can absorb smaller players
- Absorbed players are eliminated from the game
- Combat adds strategic depth to gameplay

### World Boundaries

- Game world has defined boundaries (500x500 units)
- Players cannot move outside the world limits
- Boundary collision detection prevents players from escaping

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Agar IO"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   node server.js
   ```

4. **Open the game**
   - Open your web browser
   - Navigate to `http://localhost:9000`
   - Enter your name and start playing!

## 🎮 How to Play

1. **Join the Game**: Enter your name in the login modal
2. **Choose Game Mode**: Select "Play Solo" or "Join a Team"
3. **Movement**: Move your mouse to control your character
4. **Collect Orbs**: Move over orbs to absorb them and grow
5. **Avoid Larger Players**: Stay away from players bigger than you
6. **Hunt Smaller Players**: Absorb smaller players to grow quickly
7. **Climb the Leaderboard**: Compete for the highest score

## 🔧 Configuration

### Game Settings

The game settings can be modified in `socketStuff/socketMain.js`:

```javascript
const settings = {
  defaultNumberOfOrbs: 500, // Number of orbs in the world
  defaultSpeed: 6, // Player movement speed
  defaultSize: 6, // Starting player size
  defaultZoom: 1.5, // Camera zoom level
  worldWidth: 500, // Game world width
  worldHeight: 500, // Game world height
  defaultGenericOrbSize: 5, // Standard orb size
};
```

### Server Configuration

- **Port**: Default port is 9000 (configurable in `server.js`)
- **Static Files**: Served from the `public/` directory
- **Socket.io**: Handles real-time communication

## 🏗️ Architecture Overview

### Client-Server Communication

1. **Connection**: Client connects via Socket.io
2. **Initialization**: Server sends initial game state (orbs, player index)
3. **Movement**: Client sends movement vectors via 'tock' events
4. **Updates**: Server broadcasts game state via 'tick' events
5. **Collisions**: Server handles collision detection and scoring

### Key Classes

- **Player**: Represents a connected player with socket ID and game data
- **PlayerData**: Manages player statistics (position, score, size)
- **PlayerConfig**: Handles player configuration (speed, vectors)
- **Orb**: Represents collectible orbs in the game world

### Event Flow

```
Client Mouse Move → Calculate Vectors → Send 'tock' → Server Updates Position →
Check Collisions → Update Game State → Send 'tick' → Client Renders
```

## 🐛 Known Issues & Troubleshooting

### Common Issues

1. **No Movement**: Check browser console for JavaScript errors
2. **Connection Issues**: Ensure server is running on port 9000
3. **Performance**: Large numbers of players may affect performance

### Debug Mode

Enable console logging by uncommenting debug statements in the client-side files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Team-based gameplay
- [ ] Power-ups and special abilities
- [ ] Improved graphics and animations
- [ ] Mobile device support
- [ ] Spectator mode
- [ ] Game replay system
- [ ] Custom skins and themes
- [ ] Tournament mode

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console for error messages
3. Open an issue on the repository

---

**Enjoy playing Agar.io Clone!** 🎉
