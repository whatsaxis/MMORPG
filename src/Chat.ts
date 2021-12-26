import { ChatOptions, MessageType } from './types'

/*
* Chat Interface
*
* An API allowing easy interaction with the chat
*/

namespace Chat {
    const chat = document.querySelector('#chat')

    function scrollChat() {
        if (!chat) return

        chat.scrollTop = chat?.scrollHeight
    }

    function $generate(options: ChatOptions) {
        const { by, type, message } = options

        const msg = document.createElement('div')

        msg.classList.add('chat-message')
        msg.textContent = message

        const tag = document.createElement('div')
        tag.textContent = by === undefined ? '' : by

        if (type === MessageType.SERVER) {
            tag.textContent = ''
            tag.classList.add('chat-server')
        }
        else if (type === MessageType.NPC) tag.classList.add('chat-npc')

        msg.prepend(tag)

        return msg
    }

    export function send(options: ChatOptions) {
        chat?.append( $generate(options) )

        scrollChat()
    }

    export function question(options: ChatOptions, choices: string[]) {
        return new Promise((resolve) => {
            const COLORS = [
                    '#80c71f',
                    '#ff5555',
                    '#ffd83d',
                    '#f9801d',
                    '#3c44a9',
                    '#169c9d',
                    '#c64fbd'
                ]

            const m = $generate(options)

            /*
            * Special variables for later
            */

            let finalChoice: string | null = null

            let _listeners: (() => void)[] = []
            let _choices: HTMLSpanElement[] = []
    
            const ques = document.createElement('div')

            // Used for color stuff
            let color_counter = 0
            let choice_counter = 0
    
            /*
            * Loop through the choices, adding them to the chat display
            */

            m.append( document.createTextNode(' [') )

            for (const choice of choices) {
                const ans = document.createElement('span')
                ans.classList.add('chat-question__choice')

                // Weird color stuff

                ans.textContent = choice
                ans.setAttribute('style', `color: ${ COLORS[color_counter] };`)
    
                /*
                * Handler for when a choice is selected
                */

                const handler = () => {
                    finalChoice = choice
    
                    ques.innerHTML = ''

                    ans.classList.remove('chat-question__choice')
                    ques.append(ans)

                    resolve(finalChoice)
                }
    
                ans.addEventListener('click', handler)
    
                _listeners.push(handler)
                _choices.push(ans)
                
                // Let's increment some counters!

                if (color_counter + 1 > COLORS.length - 1) color_counter = 0
                else color_counter++

                choice_counter++
    

                ques.append(ans)

                if (choice_counter !== choices.length) ques.append( document.createTextNode('/') )
            }

            m.append(ques)
            m.append( document.createTextNode(']') )

            chat?.append(m)

            scrollChat()
        })
    }

    export function widget(element: HTMLElement) {
        chat?.append(element)
        scrollChat()
    }
}

export default Chat