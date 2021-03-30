import { Message } from 'view-design'
export const abnormalPrompt = (name, message, time = 1) => {
  Message[name]({
    content: message,
    duration: time
  })
}
