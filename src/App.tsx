import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import './App.css'
import Post from './components/post/Post'
import queryClient from './query-client'

function App() {
  const [postId, setPostId] = useState(null)

  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  }

  const goBackFn = () => {
    setPostId(null)
  }
  //query
  const { data, isLoading } = useQuery('posts', fetchPosts)

  //mutation
  const postForm = () => {
    return new Promise(resolve=>{
      setTimeout(()=>{
        resolve({user:{email:"lucas@email.com"}})
        console.log('post form function was called')
      },1000)
    })
  }
  
    const mutation = useMutation(() => postForm(),{
      onError: (error)=>{console.log(`An error occured: ${error}`)},
      onSuccess: (data)=>{console.log(`Your form was successfully submited, we have sent an email to ${data.user.email} `)}
    })
  
    const callMutation = () => {
      console.log('submiting form ...')
      mutation.mutate()
    }

    const postClick = async (id: any) => {
      setPostId(id)
    }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  const allPosts = data.map((post: any) => {
    const cachedData = queryClient.getQueryData(['post', post.id])
    const cachedState = queryClient.getQueryState(['post', post.id])
    const date = new Date(cachedState?.dataUpdatedAt)
    const dataUpdatedAt = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return (
      <p onClick={() => postClick(post.id)} key={post.id}>
        {cachedData && `(updated at ${dataUpdatedAt}) `}
        {post.id}- {post.title}
      </p>
    )
  })


  return (
    <div className="App">
      <button onClick={callMutation}>Post form (console)</button>
      <div>
        {postId ? <Post goBackFn={goBackFn} postId={postId} /> : allPosts}
      </div>
    </div>
  )
}

export default App
