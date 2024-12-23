
# Instruktioner för användning av DailyFocus

Följ dessa steg för att starta och använda DailyFocus:

## Steg 1: Förbered servern
1. Öppna terminalen.
2. Navigera till servermappen:
   ```bash
   cd server
   ```
3. Installera nödvändiga paket:
   ```bash
   npm install
   ```
4. Skapa en `.env`-fil i servermappen och klistra in följande variabler:
   ```env
   MONGO_URL=mongodb+srv://osmanity:oGdWPDVYQtHGqWgJ@cluster0.wmoa7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=osmanity
   OPENAI_API_KEY=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
   ```
4. Starta igång utvecklingsservern:
   ```bash
   npm run dev
   ```

## Steg 2: Starta klienten
1. Öppna en ny terminal.
2. Navigera till klientmappen:
   ```bash
   cd client
   ```
3. Installera nödvändiga paket:
   ```bash
   npm install
   ```
4. Starta igång webbapplikationen:
   ```bash
   npm run dev
   ```

## Färdigt!
Din applikation borde nu vara igång. Öppna webbläsaren och navigera till den URL som visas i terminalen för att börja använda DailyFocus.
