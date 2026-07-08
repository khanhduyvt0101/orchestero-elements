import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ChatMessageRole = "user" | "assistant" | "system" | "tool"

function ChatMessage({
  from = "assistant",
  className,
  ...props
}: React.ComponentProps<"article"> & {
  from?: ChatMessageRole
}) {
  return (
    <article
      data-slot="chat-message"
      data-role={from}
      className={cn(
        "group/chat-message flex w-full min-w-0 items-start gap-3 data-[role=user]:flex-row-reverse",
        className
      )}
      {...props}
    />
  )
}

function ChatMessageAvatar({
  src,
  fallback,
  className,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  src?: string
  fallback?: React.ReactNode
}) {
  return (
    <Avatar
      data-slot="chat-message-avatar"
      size="sm"
      className={cn("mt-1", className)}
      {...props}
    >
      {src ? <AvatarImage src={src} alt="" /> : null}
      <AvatarFallback>{fallback ?? "AI"}</AvatarFallback>
    </Avatar>
  )
}

function ChatMessageBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-message-body"
      className={cn(
        "flex max-w-[min(42rem,85%)] min-w-0 flex-col gap-2 group-data-[role=user]/chat-message:items-end",
        className
      )}
      {...props}
    />
  )
}

function ChatMessageContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-message-content"
      className={cn(
        "rounded-xl bg-muted px-3 py-2 text-sm leading-6 text-foreground group-data-[role=assistant]/chat-message:bg-transparent group-data-[role=assistant]/chat-message:px-0 group-data-[role=assistant]/chat-message:py-0 group-data-[role=user]/chat-message:bg-primary group-data-[role=user]/chat-message:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

function ChatMessageMeta({
  className,
  ...props
}: React.ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="chat-message-meta"
      variant="outline"
      className={cn("font-normal", className)}
      {...props}
    />
  )
}

function ChatMessageActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-message-actions"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

export {
  ChatMessage,
  ChatMessageActions,
  ChatMessageAvatar,
  ChatMessageBody,
  ChatMessageContent,
  ChatMessageMeta,
  type ChatMessageRole,
}
