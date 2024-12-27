# Application for Learning English Words Using Flashcards

This project is a web-based application designed to help users learn English words through interactive flashcards. The app provides a simple and effective way to study vocabulary by displaying flashcards, which the user can review and quiz themselves with. It features customizable modes, allowing users to change languages and control the order of the cards for better learning flexibility.

## Features
- **Flashcard Creation**: Users can create flashcards with a title and language (English or Russian).
- **Word Pairing**: Users can link Russian and English words together.
- **Study Mode**:
  - Display two cards in different languages, one hidden, which the user can reveal when ready.
  - Users can switch the language of the hidden card (English, Russian, or random).
  - Flexible card order: choose between random or shuffled orders for varied learning experiences.
- **Data Validation**: Strong validation for both client and server using Zod.
- **Typesafe API**: API interactions powered by tRPC for typesafe communication between frontend and backend.
- **Database Integration**: Persistent data storage using Prisma ORM.

## Tech Stack

### Frontend
- TypeScript
- React
- Next.js
- Zod

### Backend
- TypeScript
- Next.js
- Prisma ORM
- tRPC
