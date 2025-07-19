# Chat Interface Components

A modular, TypeScript-based chat UI system designed for AI conversations with a cosmic theme.

## Components

### ChatInterface
The main chat component that orchestrates the entire chat experience.

**Features:**
- Scrollable message history
- AI thinking indicator
- Auto-scroll to bottom
- Message animations
- Cosmic-themed styling

**Props:**
- None (self-contained state management)

**Usage:**
```tsx
import { ChatInterface } from '@/components/chat/ChatInterface'

<ChatInterface />
```

### ChatMessage
Displays individual messages with proper styling for user and AI.

**Props:**
- `message: Message` - The message object to display

**Features:**
- Different styling for user vs AI messages
- Timestamp display
- Avatar integration
- Smooth animations

### ChatInput
Input bar with text field and action buttons.

**Props:**
- `value: string` - Current input value
- `onChange: (value: string) => void` - Input change handler
- `onSend: (message: string) => void` - Send message handler
- `onMicClick: () => void` - Microphone click handler
- `disabled?: boolean` - Disable input (optional)

**Features:**
- Enter key to send
- Disabled state during AI thinking
- Cosmic-themed styling
- Mic button (UI only for now)

### ChatAvatar
AI agent avatar with cosmic animations.

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Avatar size (default: 'md')

**Features:**
- Animated background glow
- Cosmic particle effects
- Hover animations
- Multiple sizes

## Message Interface

```tsx
interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}
```

## Integration

The chat interface is integrated into the main navigation as a "Chat" view. Users can access it by clicking the chat icon in the cosmic navigation.

## Customization

### Colors
The chat uses the cosmic color palette:
- Primary: `#00bfff` (Celestial Blue)
- Secondary: `#8a2be2` (Electric Violet)
- Accent: `#ffd700` (Starlight Gold)
- Success: `#7fff00` (Aurora Green)
- Warning: `#ff69b4` (Plasma Pink)

### Styling
All components use TailwindCSS with custom cosmic borders and gradients defined in `@/lib/utils`.

### Animations
Uses Framer Motion for smooth animations and transitions.

## Future Enhancements

- Voice input functionality
- Message reactions
- File attachments
- Typing indicators
- Message search
- Conversation history persistence 