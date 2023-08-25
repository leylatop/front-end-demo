const dataSource = [
  ["https://ai-md.openai.azure.com/openai/deployments/AI/chat/completions?api-version=2023-05-15", "862055f1ae274fefa9f40760a0770e88"],
  ["https://ai-md-2.openai.azure.com/openai/deployments/AI-2/chat/completions?api-version=2023-05-15", "d6668c9e22c84442bc6cf97bde8094d9"],
  ["https://ai-md-3.openai.azure.com/openai/deployments/AI-3/chat/completions?api-version=2023-05-15", "808ffc1009be47679a6fdf7c730cd4c5"],
  ["https://ai-md-4.openai.azure.com/openai/deployments/AI-4/chat/completions?api-version=2023-05-15", "c39aed726cfd4ef0ac9459c041fffdc2"],
  ["https://ai-md-5.openai.azure.com/openai/deployments/AI-5/chat/completions?api-version=2023-05-15", "85c538dd28fe47bfb491e2b4febf5c52"],
  ["https://ai-md-6.openai.azure.com/openai/deployments/AI-6/chat/completions?api-version=2023-05-15", "61e7bd6933634ba3a2b8b98686f42216"],
  ["https://ai-md-7.openai.azure.com/openai/deployments/AI-7/chat/completions?api-version=2023-05-15", "4ec421545829403fa232628f6167e561"],
  ["https://ai-md-8.openai.azure.com/openai/deployments/AI-8/chat/completions?api-version=2023-05-15", "66de83e1228742009fbcb80c76590cdf"],
  ["https://ai-md-9.openai.azure.com/openai/deployments/AI-9/chat/completions?api-version=2023-05-15", "2f6326bbf137484d9ccc2ea510917b00"],
  ["https://ai-md-10.openai.azure.com/openai/deployments/AI-10/chat/completions?api-version=2023-05-15", "a754035ca3904060b1c596cde9a07bb0"]
]

const USER_ROLE = 'user'
const ASSISTANT_ROLE = 'assistant'
const SYSTEM_ROLE = 'system'
// const ROLE_MAP = {
//   [USER_ROLE]: '我',
//   [ASSISTANT_ROLE]: '机器人',
//   [SYSTEM_ROLE]: '系统'
// }
const MESSAGE_KEY = 'message' + new Date().toLocaleDateString()
// const defaultMessages = [
//   {
//     "content": "你好，请在输入框中输入你想要提问的问题",
//     "role": "system"
//   }
// ]
const defaultMessages = []
const loadingMessages = [
  {
    "content": "正在思考中...",
    "role": "system"
  }
]

const messages = localStorage.getItem(MESSAGE_KEY) ? JSON.parse(localStorage.getItem(MESSAGE_KEY)) : defaultMessages

// 请求 OpenAI 接口
async function requestOpenAI() {
  const randomIndex = Math.floor(Math.random() * dataSource.length)
  const url = dataSource[randomIndex][0]
  const apiKey = dataSource[randomIndex][1]
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      "messages":    messages, // 对话信息
      "max_tokens":  1500,     // 生成答案的最大令牌数
      "user":        '375453414',     //代表您的最终用户的唯一标识符, 可以帮助 OpenAI 监控和检测滥用行为。
      "temperature": 0.7,
      "top_p":       0.7,
    })
  })
  const json = await response.json()
  return json
}

// 从返回的数据中获取回复消息
function getReplayMessageFromData(data) {
  const { choices } = data
  const { message } = choices[0]
  return message

}

// 展示聊天记录
function showChatHistory() {
  const chatHistory = document.getElementById('history-body')
  chatHistory.innerHTML = ''
  messages.forEach(message => {
    const { content, role } = message
    const messageItem = document.createElement('div')
    messageItem.className = `message ${role}`
    messageItem.innerHTML = marked.parse(`${content}`)
    // messageItem.appendChild(<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.667.9a1.6 1.6 0 0 0-1.6 1.6v.866h-1.2a1.6 1.6 0 0 0-1.6 1.6v8.5a1.6 1.6 0 0 0 1.6 1.6h7.5a1.6 1.6 0 0 0 1.6-1.6V13.1h1.2a1.6 1.6 0 0 0 1.6-1.6v-9a1.6 1.6 0 0 0-1.6-1.6h-7.5Zm6.3 11h1.2a.4.4 0 0 0 .4-.4v-9a.4.4 0 0 0-.4-.4h-7.5a.4.4 0 0 0-.4.4v.866h6.1a.6.6 0 0 1 .6.6V11.9Zm-9.1-7.334a.4.4 0 0 0-.4.4v8.5c0 .22.179.4.4.4h7.5a.4.4 0 0 0 .4-.4v-8.9h-7.9Zm1.634 2.5a.6.6 0 0 0 0 1.2h4a.6.6 0 0 0 0-1.2h-4Zm0 2.967a.6.6 0 1 0 0 1.2h4a.6.6 0 1 0 0-1.2h-4Z" fill="#000" fill-opacity="0.5"></path></svg>)

    chatHistory.appendChild(messageItem)
    chatHistory.appendChild(document.createElement('br'))
  })
  // 自动滚动到最底端
  chatHistory.scrollTop = chatHistory.scrollHeight
}

// 清空聊天记录
function clearChatHistory() {
  localStorage.removeItem(MESSAGE_KEY)
  messages.length = 0
  showChatHistory()
}
// 发送消息，并等待消息回复
async function handleReportMessage() {
  const message = document.getElementById('input').value
  if (message) {
    const messageItem = {
      content: message,
      role: USER_ROLE
    }
    messages.push(messageItem)
    messages.push(...loadingMessages)
    showChatHistory()
    document.getElementById('input').value = ''
    const data = await requestOpenAI()
    const replayMessageItem = getReplayMessageFromData(data)
    messages.pop()
    messages.push(replayMessageItem)
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages))
    showChatHistory()
  }
}

// 监听键盘事件，Enter键发送消息，Enter+Shift键换行
function handleKeyDown(e) {
  if (e.keyCode === 13 && !e.shiftKey) {
    e.preventDefault(); // 阻止默认的换行行为
    handleReportMessage()
  } else if (e.keyCode === 13 && e.shiftKey) {
    console.log('普通换行事件');
  }
}
// 自动复制鼠标选中的文案
function handleAutoCopySelectedText(e) {
  // 复制选中的文案
  const selectedText = window.getSelection().toString()
  if (selectedText) {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', selectedText)
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, 9999)
    document.execCommand('copy')
    document.body.removeChild(input)
  }
}
function handleMouseUp(e) {
  // 松开鼠标时，自动复制选中的文案
  handleAutoCopySelectedText(e)
}
const clearButton = document.getElementById('clear')
const sendButton = document.getElementById('send')
const input = document.getElementById('input')
clearButton.addEventListener('click', clearChatHistory)
sendButton.addEventListener('click', handleReportMessage)
input.addEventListener('keydown', handleKeyDown)
document.addEventListener('mouseup', handleMouseUp)

showChatHistory()