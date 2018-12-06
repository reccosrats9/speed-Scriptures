import React, { Component } from 'react'
import Pause from '@material-ui/icons/PauseCircleFilled'
import Play from '@material-ui/icons/PlayCircleFilled'

export default class Structure extends Component {
    constructor() {
        super()
        this.state = {
            section: '',
            text: [],
            fullText: '',
            word: '',
            i: 0,
            paused: false
        }
    }

    togglePause = () => {
        this.setState({ paused: !this.state.paused }, this.timeOutCounter)
    }

    updateSection = (section, sectionIndex) => {
        const { selectedBook } = this.props
        let text = []
        let fullText = ''
        selectedBook.sections[sectionIndex].verses.forEach(verse => text.push({ verse: verse.verse, text: verse.text + ' ' }))
        text.forEach(verse => fullText += verse.text)
        fullText=fullText.split(' ')
        this.setState({ section, text, fullText })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fullText !== this.state.fullText) {
            this.timeOutCounter()
        }
    }

    timeOutCounter = () => {
        let { fullText, i, paused } = this.state
        if (i < fullText.length && !paused) {
            this.timer(i)
        } else if (i >= fullText.length) {
            this.setState({i:0, word: ''})
        }
    }

    timer = (i) => {
        setTimeout(() => {
            this.setState({ word: this.state.fullText[i], i:i+1 }, this.timeOutCounter)
        }, this.props.speed)
    }

    render() {
        const { selectedBook } = this.props
        if (selectedBook) {
            const { section, word } = this.state
            if (!word) {
                let sections = selectedBook.sections.map((section, sectionI) => {
                    return (
                        <button key={sectionI} onClick={() => this.updateSection(section.reference, sectionI)} className='booksChapsContainer' >{section.section}</button>
                    )
                })

                return (
                    <div className='booksChapsContainer' >
                        <h2>{selectedBook.title}</h2>
                        {sections}
                    </div>
                )
            } else {
                return (
                    <div className="wordContainer">
                        {this.state.paused ?
                            <Play style={{ color: 'F4F4F4', height: 50, width: 50, position: 'fixed', top: '25vh' }} onClick={this.togglePause} />
                            : <Pause style={{ color: 'F4F4F4', height: 50, width: 50, position: 'fixed', top: '25vh' }} onClick={this.togglePause} />}    
                        <h4>{section}</h4>
                        <h1 className='word' >{word}</h1>
                    </div>
                )
            }
        } else { return null }
    }
}
