import React from 'react'



const GameHistoryData = [
    {
        outcome: 1,
        result: +12,
        opponent: "JohnSmith1982",
        date: "2018-03-20",
        gameid: 646464,
    },
    {
        outcome: 0,
        result: 0,
        opponent: "JohnSmith1982",
        date: "2018-03-20",
        gameid: 646464,
    },
    {
        outcome: -1,
        result: -11,
        opponent: "JohnSmith1982",
        date: "2018-03-20",
        gameid: 646464,
    },
    {
        outcome: 1,
        result: +12,
        opponent: "JohnSmith1982",
        date: "2018-03-20",
        gameid: 646464,
    },
    {
        outcome: -1,
        result: -20,
        opponent: "JohnSmith1982",
        date: "2018-03-20",
        gameid: 646464,
    },
]


export class GameHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div className='game-history'>
                <table className='history-table'>
                    <tbody>
                        <tr key="header" className='table-header'>
                            <th className='table-outcome'> </th>
                            <th className='table-result'> Result </th>
                            <th className='table-opponent'> Opponent </th>
                            <th className='table-date'> Date </th>
                            <th className='table-replay'>  </th>
                        </tr>
                        {
                            GameHistoryData.map ( (data, index) => {
                                let classNameOutcome="win";
                                let classNameResult="success";

                                if (data.outcome == 0) { classNameOutcome="draw" }
                                else if(data.outcome < 0) { classNameOutcome="lose" }

                                if (data.result == 0) { classNameResult="even" }
                                else if(data.result < 0) { classNameResult="fail" }
                                return (

                                    <tr key={index} className='table-row'>
                                        <td className={'table-outcome ' + classNameOutcome}> </td>
                                        <td className={'table-result ' + classNameResult}> {data.result>0? "+":""}{data.result} </td>
                                        <td className='table-opponent'> {data.opponent} </td>
                                        <td className='table-date'> {data.date} </td>
                                        <td className='table-replay'>
                                            <button className='button replay-button'>Replay</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GameHistory
