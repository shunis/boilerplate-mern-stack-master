import React, {useEffect, useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux'

import Axios from 'axios'

const { TextArea } = Input;

function ReplyComment() {

    return (
        <div>
            <p style={{ fontSize: '14px', margin: 0, color: 'gray' }}
                onClick={handleChange} >
                View {ChildCommentNumber} more comment(s)
             </p>

        </div>
    )
}

export default ReplyComment
