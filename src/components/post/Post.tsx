import React from 'react'
import { useQuery } from 'react-query'

const Post = ({ goBackFn, postId }: any) => {
  const fetchPost = async ({ queryKey }: any) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${queryKey[1]}`
    )
    return response.json()
  }

  const { data, isLoading } = useQuery(['post', postId], fetchPost,{
      staleTime: 60000
  })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <button onClick={goBackFn}>Go Back</button>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}

export default Post
