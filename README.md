# TaskMaster: User-Centric Todo List Manager

## Overview

TaskMaster is a React-based web application that allows multiple users to manage their todo lists efficiently. It provides a user-friendly interface for viewing users, their respective todo lists, and offers features like filtering completed tasks.

## Features

- Display a list of users
- View and manage todo lists for each user
- Toggle task completion status
- Filter completed/uncompleted tasks
- Persistent state management across sessions
- Responsive design for various screen sizes

## Technology Stack

- React 18
- TypeScript
- React Router v6 for navigation
- Material-UI (MUI) for UI components
- Context API for state management
- SessionStorage for client-side data persistence

## Project Structure

```
src/
├── components/
│   ├── User.tsx
│   ├── UsersList.tsx
│   ├── TodoList.tsx
│   └── TodoItem.tsx
├── contexts/
│   ├── UserContext.tsx
│   └── UseUserContext.tsx
├── Interface/
│   ├── IUser.ts
│   └── ITodo.ts
├── App.tsx
├── main.tsx
└── error-page.tsx
```

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/ArielAmon/users-task-menagment.git
   cd taskmaster
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser to view the app.

## Usage

- The home page displays a list of users.
- Click on a user's "Show Todos" button to view their todo list.
- Use the "Hide completed" toggle to filter out completed tasks.
- Click on a task to mark it as complete or incomplete.

## Main Components

### App.tsx

The main component that fetches user data and provides the overall layout.

### UsersList.tsx

Displays the list of users and handles the selection of a user to view their todos.

### TodoList.tsx

Shows the todo list for a selected user, including task filtering and toggling functionality.

### UserContext.tsx

Manages the global state for selected user and hide completed preference.

## API Integration

The application fetches user and todo data from the JSONPlaceholder API:

- Users: `https://jsonplaceholder.typicode.com/users`
- Todos: `https://jsonplaceholder.typicode.com/users/{userId}/todos`

## State Management

- React Context is used for global state management (selected user and hide completed preference).
- SessionStorage is utilized to persist user selection and hide completed preference across page reloads.

## Error Handling

The application includes a custom error page (`error-page.tsx`) to handle and display routing errors gracefully.

## Performance Optimizations

- `useCallback` is used to memoize callback functions in the TodoList component.
- `useMemo` is employed to optimize the filtering of todos based on the hide completed preference.

## Contributing

Contributions to TaskMaster are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing the mock API

---

For any additional questions or support, please open an issue in the GitHub repository.
