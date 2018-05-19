import React from 'react'
import { RegisterApi } from '../api'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../containers'
import { Page, Header, Content } from '../components'

export const NotFoundPage = (props) => {
    return (
        <Page className='page home-page'>
            <Content>
                <div className='sidebar'>
                    <h1 className='page-title'>
                        Let&apos;s Play Chess
                    </h1>
                </div>
            </Content>
        </Page>
    )

}

export default NotFoundPage
