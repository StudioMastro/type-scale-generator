# Type Scale Generator

Un'applicazione web interattiva per generare e visualizzare scale tipografiche per progetti web. Configura e personalizza facilmente la tua tipografia per creare gerarchie visive coerenti e armoniose.

## 🌐 Demo

Visita l'applicazione: [Type Scale Generator](https://studiomastro.github.io/type-scale-generator/)

![Screenshot dell'applicazione](https://via.placeholder.com/800x450?text=Type+Scale+Generator+Screenshot)

## ✨ Funzionalità

- **Generazione di scale tipografiche**: crea scale tipografiche basate su vari rapporti (quadrato minore, terza maggiore, quarta perfetta, ecc.)
- **Anteprima in tempo reale**: visualizza istantaneamente gli effetti delle modifiche alla tipografia
- **Personalizzazione font**: scegli tra vari font Google o utilizza font di sistema
- **Controlli avanzati**: modifica dimensione base, unità di misura, rapporto, peso e altro ancora
- **Anteprima sito web**: visualizza la tua scala tipografica applicata a un layout di sito web realistico
- **Gestione responsive**: visualizza come la tipografia si adatta a diversi formati di dispositivi
- **Esportazione**: possibilità di utilizzare le impostazioni direttamente nei tuoi progetti

## 🚀 Tecnologie Utilizzate

- [React](https://reactjs.org/) - Libreria UI
- [TypeScript](https://www.typescriptlang.org/) - Supporto per il tipo statico
- [Vite](https://vitejs.dev/) - Build tool e dev server
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Zustand](https://github.com/pmndrs/zustand) - Gestione dello stato
- [Lucide React](https://lucide.dev/) - Icone
- [WebFontLoader](https://github.com/typekit/webfontloader) - Caricamento di font web
- [Tailwind Scrollbar](https://github.com/adoxography/tailwind-scrollbar) - Personalizzazione scrollbar

## 🛠️ Installazione e Sviluppo

### Prerequisiti

- Node.js (versione 18 o superiore)
- npm o yarn

### Setup del progetto

```bash
# Clona il repository
git clone https://github.com/StudioMastro/type-scale-generator.git
cd type-scale-generator

# Installa le dipendenze
npm install
# oppure
yarn install

# Avvia il server di sviluppo
npm run dev
# oppure
yarn dev
```

L'applicazione sarà disponibile all'indirizzo `http://localhost:3000`.

### Comandi disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Crea una build di produzione
- `npm run lint` - Esegue il linting del codice
- `npm run preview` - Anteprima della build di produzione
- `npm run deploy` - Pubblica su GitHub Pages

## 📚 Come usare l'applicazione

1. **Seleziona un font di base** dall'elenco dei font disponibili
2. **Imposta la dimensione di base** del testo (solitamente la dimensione del corpo del testo)
3. **Scegli un rapporto** per la scala tipografica
4. **Personalizza ulteriori parametri** come peso del font, interlinea, ecc.
5. **Visualizza l'anteprima** sia nella visualizzazione scala che nel mockup del sito
6. **Alterna tra dispositivi** per verificare la responsività

## 📂 Struttura del Progetto

```
src/
├── components/       # Componenti UI
├── hooks/            # Hook personalizzati
├── store/            # Gestione dello stato (Zustand)
├── types/            # Definizioni TypeScript
├── utils/            # Funzioni di utilità
├── App.tsx           # Componente principale
└── main.tsx          # Entry point
```

## 🤝 Contribuire

I contributi sono benvenuti! Per favore, segui questi passi:

1. Fai il fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Fai commit delle tue modifiche (`git commit -m 'Aggiungi una nuova funzionalità'`)
4. Pusha al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 📄 Licenza

Distribuito sotto la licenza MIT. Vedi `LICENSE` per ulteriori informazioni.

## 📬 Contatti

Studio Mastro - [GitHub](https://github.com/StudioMastro)

Link al progetto: [https://github.com/StudioMastro/type-scale-generator](https://github.com/StudioMastro/type-scale-generator)
