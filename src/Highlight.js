import React from 'react';
import tmi from "tmi.js";

class Highlight extends React.Component {
    componentDidMount() {
        const client = new tmi.Client({
            channels: ['usquikz_live']
        });

        client.connect();

        client.on('message', (channel, tags, message, self) => {
            if (message.includes("!alert ")) {
                document.querySelector("#content").firstChild.innerHTML = `${tags['display-name']}: ${message.replace("!alert ", "")}`;
                console.log(this.text);
                this.showMessage()
            }
        });
    }

    showMessage () {
        let content = document.querySelector("#content");
        content.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: 400,
            iterations: 1,
        })
        content.style.opacity = 1
        setTimeout(this.hideMessage, 2000)
    }

    hideMessage () {
        let content = document.querySelector("#content");
        content.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 400,
            iterations: 1,
        })
        content.style.opacity = 0
    }

    render() {
        return (
            <div id="content">
                <h1 className="test">{this.text}</h1>
            </div>
        )
    }
}

export default Highlight