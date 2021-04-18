import './App.css';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.createBoard(),
            users: 0
        };
        this.createBoard();
    }

    createBoard = () => {
        const rows = 3;
        const columns = 3;
        const boardGrid = [];

        for (let i = 0; i < rows*columns; i = i + 1) {
            boardGrid.push({
                content: ' ',
                index: i
            });
        }

        return boardGrid;
    }

    flipUser() {
        let user;
        this.state.user === 'one' ? user = 'two' : user = 'one';
        this.setState({
            user: user
        });
    }

    render() {

        const handleClick = (el, index) => {
            const boardGrid = [...this.state.board];
            this.state.user === 'one' ? boardGrid[index].content = 'X' : boardGrid[index].content = '0'
            this.setState({
                board: boardGrid
            });

            this.flipUser();
        }

        return <React.Fragment>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                    textAlign: "center",
                }}>
                {
                    this.state.board.map(el => {
                        return (
                            <button
                                key={el.index}
                                position={el.index}
                                style={{padding: "32px"}}
                                onClick={(e) => handleClick(e, el.index)}
                            >{el.content}</button>
                        )
                    })
                }
            </div>
        </React.Fragment>
    }
}

export default App;
