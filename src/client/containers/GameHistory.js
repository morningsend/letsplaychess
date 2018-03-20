import React from 'react'

export class GameHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div className='game-history'>
                <table className='history-table'>
                    <tr className='table-header'>
                        <th className='table-outcome'> </th>
                        <th className='table-result'> Result </th>
                        <th className='table-opponent'> Opponent </th>
                        <th className='table-date'> Date </th>
                        <th className='table-replay'>  </th>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-outcome'>  </td>
                        <td className='table-result'> 12 </td>
                        <td className='table-opponent'> stranger101(1020) </td>
                        <td className='table-date'> 3 days ago </td>
                        <td className='table-replay'>
                            <button class='button replay-button'>Replay</button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default GameHistory
