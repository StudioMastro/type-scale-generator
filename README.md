# Type Scale Generator

An interactive web application for generating and visualizing typographic scales for web projects. Easily configure and customize your typography to create consistent and harmonious visual hierarchies.

## 🌐 Demo

Visit the application: [Type Scale Generator](https://studiomastro.github.io/type-scale-generator/)

![Application Screenshot](https://via.placeholder.com/800x450?text=Type+Scale+Generator+Screenshot)

## ✨ Features

- **Typographic Scale Generation**: create typographic scales based on various ratios (minor second, major third, perfect fourth, etc.)
- **Real-time Preview**: instantly see the effects of typography changes
- **Font Customization**: choose from various Google fonts or use system fonts
- **Advanced Controls**: modify base size, measurement units, ratio, weight, and more
- **Website Preview**: see your typographic scale applied to a realistic website layout
- **Responsive Management**: view how typography adapts to different device formats
- **Export Options**: ability to use settings directly in your projects

## 🚀 Technologies Used

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Static type support
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Lucide React](https://lucide.dev/) - Icons
- [WebFontLoader](https://github.com/typekit/webfontloader) - Web font loading
- [Tailwind Scrollbar](https://github.com/adoxography/tailwind-scrollbar) - Scrollbar customization

## 🛠️ Installation and Development

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Project Setup

```bash
# Clone the repository
git clone https://github.com/StudioMastro/type-scale-generator.git
cd type-scale-generator

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Available Commands

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run lint` - Run code linting
- `npm run preview` - Preview the production build
- `npm run deploy` - Publish to GitHub Pages

## 📚 How to Use the Application

1. **Select a base font** from the list of available fonts
2. **Set the base size** of the text (usually the size of the body text)
3. **Choose a ratio** for the typographic scale
4. **Customize additional parameters** such as font weight, line height, etc.
5. **View the preview** in both the scale view and the site mockup
6. **Toggle between devices** to check responsiveness

## 📂 Project Structure

```
src/
├── components/       # UI Components
├── hooks/            # Custom hooks
├── store/            # State management (Zustand)
├── types/            # TypeScript definitions
├── utils/            # Utility functions
├── App.tsx           # Main component
└── main.tsx          # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add a new feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📬 Contact

Studio Mastro - [GitHub](https://github.com/StudioMastro)

Project Link: [https://github.com/StudioMastro/type-scale-generator](https://github.com/StudioMastro/type-scale-generator)
