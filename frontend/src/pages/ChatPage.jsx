import React from 'react'
import { useState, useEffect } from 'react'
import { getStreamToken } from '../lib/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { useAuthUser } from '../hooks/useAuthUser'
import { StreamChat } from 'stream-chat'
import ChatLoader from '../components/ChatLoader'
import toast from 'react-hot-toast'
import CallButton from '../components/CallButton'


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
const ChatPage = () => {
  const { authUser } = useAuthUser()
  const { id } = useParams()

  const [chatClient, setChatClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(true)

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser //this willl run only when auth user is available
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, id].sort().join("-");

        // if you and me
        // if I start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId] => [myId, yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, id],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, id]);

  const handleVideoCall = () => {
    if(channel){
      const callUrl=`${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text:`I have started a video call .Join me here :${callUrl}`
      })
      toast.success("Video call link sent succesfully")
    }
  }
  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className='h-[92vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}


export default ChatPage