import './App.css';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);

        const contestant = [
            {name: 'one', mark: 'O'},
            {name: 'two', mark: 'X'}
        ];

        this.state = {
            board: this.createBoard(),
            users: {
                activeUser: contestant[0],
                contestant: contestant,
                winner: null,
            }
        };
    }

    createBoard = () => {
        const rows = 3;
        const columns = 3;
        const boardGrid = [];

        for (let i = 0; i < rows*columns; i = i + 1) {
            boardGrid.push({
                content: ' ',
                index: i,
            });
        }

        return boardGrid;
    }

    calculateWinner() {
        if (!this.state) {
            return
        }
        const winningSequences = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,6,4],
        ];

        const winningArray = []

        winningSequences.forEach(el => {
            winningArray.push(el.every(el => ( this.state.board[el].content === this.state.users.activeUser.mark )));
        })

        console.log(winningArray)
        if (winningArray.includes(true)) {
            return this.state.users.activeUser.name;
        }
    }

    flipUser() {
        let users = this.state.users;
        users.activeUser.mark === 'O' ? users.activeUser = users.contestant[1]
            : users.activeUser = this.state.users.contestant[0];
        this.setState({
            users: users
        });
    }

    render() {

        const handleClick = (el, index) => {
            const boardGrid = [...this.state.board];
            boardGrid[index].content = this.state.users.activeUser.mark;
            this.setState({
                board: boardGrid
            });

            const users = this.state.users;
            users.winner = this.calculateWinner();
            this.setState({
                users: users
            })
            this.flipUser();
        }

        return <React.Fragment>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto",
                    height: "100vh",
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
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    textAlign: "center",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    display: this.state.users.winner ? "block" : "none",
                }}>Winner is {this.state.users.winner ? this.state.users.winner : 'yet to decide'}</div>
        </React.Fragment>
    }
}

export default App;
