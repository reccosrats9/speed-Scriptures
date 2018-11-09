import React, { Component } from 'react'

export default class Structure extends Component {
    constructor() {
        super()
        this.state = {
            chapter: '',
            text: [],
            fullText: '',
            word: ''
        }
    }

    updateChapter = (chapter, bookIndex, chapIndex) => {
        const { selectedBook } = this.props
        let text = []
        let fullText = ''
        selectedBook.books[bookIndex].chapters[chapIndex].verses.forEach(verse => text.push({ verse: verse.verse, text: verse.text + ' ' }))
        text.forEach(verse => fullText += verse.text)
        this.setState({ chapter, text, fullText })    
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.fullText !== this.state.fullText) {
            this.timeOutCounter()
        }
    }

    timeOutCounter = () => {
        let {speed} = this.props
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
                if (!word) {
                    let booksChaps = selectedBook.books.map((book, bookI) => {
                        let chap = book.chapters.map((chapter, chapI) => {
                            return (
                                <button key={chapI} onClick={() => this.updateChapter(chapter.reference, bookI, chapI)} >{chapter.chapter}</button>
                            )
                        })
                        return (
                            <div key={bookI} className='booksChaps'>
                                <h3>{book.book}</h3>
                                <div className="chaptersBlock">
                                    {chap}
                                </div>
                            </div>
                        )
                    })

                    return (
                        <div className='booksChapsContainer' >
                            <h1 className='word' >{word}</h1>
                            <h2>{selectedBook.title}</h2>
                            {booksChaps}
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
