import React, {useEffect, useState} from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux'

import Axios from 'axios'

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)

    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")

    const onClickReplyOpen =  () => {
        setOpenReply(!OpenReply)
    }

    const onhandleChange = (event) => {
        setCommentValue(event.currentTarget.CommentValue)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.result)
                setCommentValue("")
                props.refreshFunction(response.data.result)
            } else {
                alert('코멘트를 저장 못했어요.')
            }
        })
    }

    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to </span>
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>

            {OpenReply && 
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onhandleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </form>
            }

        </div>
    )
}

export default SingleComment
