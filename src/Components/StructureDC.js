import React, { Component } from 'react'

export default class Structure extends Component {
    constructor() {
        super()
        this.state = {
            section: '',
            text: [],
            fullText: '',
            word: ''
        }
    }

    updateSection = (section, sectionIndex) => {
        const { selectedBook } = this.props
        let text = []
        let fullText = ''
        selectedBook.sections[sectionIndex].verses.forEach(verse => text.push({ verse: verse.verse, text: verse.text + ' ' }))
        text.forEach(verse => fullText += verse.text)
        this.setState({ section, text, fullText })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fullText !== this.state.fullText) {
            this.timeOutCounter()
        }
    }

    timeOutCounter = () => {
        let { speed } = this.props
        let fullText = this.state.fullText.split(' ')
        let i = 0
        setInterval(() => {
            if (i < fullText.length) {
                this.setState({ word: fullText[i] })
                i++
            }
        }, speed)
    }

    render() {
        const { selectedBook } = this.props
        if (selectedBook) {
            const { chapter, word } = this.state
            console.log(word)
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
                        <h4>{chapter}</h4>
                        <h1 className='word' >{word}</h1>
                    </div>
                )
            }
        } else { return null }
    }
}
