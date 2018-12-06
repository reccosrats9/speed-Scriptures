import React, { Component } from 'react'
import Pause from '@material-ui/icons/PauseCircleFilled'
import Play from '@material-ui/icons/PlayCircleFilled'

export default class Structure extends Component {
    constructor() {
        super()
        this.state = {
            chapter: '',
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

    updateChapter = (chapter, bookIndex, chapIndex) => {
        const { selectedBook } = this.props
        let text = []
        let fullText = ''
        selectedBook.books[bookIndex].chapters[chapIndex].verses.forEach(verse => text.push({ verse: verse.verse, text: verse.text + ' ' }))
        text.forEach(verse => fullText += verse.text)
        fullText=fullText.split(' ')
        this.setState({ chapter, text, fullText })    
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
            this.setState({ i: 0, word: '' })
        }
    }

    timer = (i) => {
        setTimeout(() => {
            this.setState({ word: this.state.fullText[i], i: i + 1 }, this.timeOutCounter)
        }, this.props.speed)
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
                            {this.state.paused ?
                                <Play style={{ color: 'F4F4F4', height: 50, width: 50, position: 'fixed', top: '25vh' }} onClick={this.togglePause} />
                                : <Pause style={{ color: 'F4F4F4', height: 50, width: 50, position: 'fixed', top: '25vh' }} onClick={this.togglePause} />}
                            <h4>{chapter}</h4>
                            <h1 className='word' >{word}</h1>
                        </div>
                    )
                }
            } else { return null }
    }
}
