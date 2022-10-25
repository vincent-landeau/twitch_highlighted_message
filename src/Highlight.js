import React from 'react';
import tmi from "tmi.js";
import {gsap} from "gsap";

class Highlight extends React.Component {
    componentDidMount() {
        const client = new tmi.Client({
            channels: process.env.REACT_APP_CHANNELS.split(' ')
        });

        client.connect();

        client.on('message', (channel, tags, message, self) => {
            if (message.includes(`!${process.env.REACT_APP_HIGHLIGHT_CMD} `) && (tags.mod || tags.badges.broadcaster === "1")) {
                document.querySelector(".username").innerHTML = tags['display-name'];
                document.querySelector(".message").innerHTML = message.replace(`!${process.env.REACT_APP_HIGHLIGHT_CMD} `, "");
                this.showMessage()
            }
        });
    }

    showMessage() {
        const tl = [
            gsap.fromTo(['.username', '.message'], {opacity: 0}, {opacity: 1, duration: .4, delay: .4}).reversed(false),
            gsap.fromTo("hr.top", {x: "-100%"}, {x: 0, duration: .4}).reversed(false),
            gsap.fromTo("hr.bottom", {x: "100%"}, {x: 0, duration: .4}).reversed(false),
            gsap.fromTo(".content", {backgroundColor: "transparent"}, {backgroundColor: "rgba(0, 0, 0, 0.8)", duration: .4}).reversed(false)
        ]
        setTimeout(() => {
            tl.forEach((value) => {
                value.reversed(true)
            })
        }, process.env.REACT_APP_HIGHLIGHT_DURATION);
    }

    render() {
        return (
            <div id="hilightedMessage" className={"container"}>
                <div className="content">
                    <hr className={"top"}/>
                    <h1 className="username"></h1>
                    <p className="message"></p>
                    <hr className={"bottom"}/>
                </div>
            </div>
        )
    }
}

export default Highlight