// App.jsx
import { Canvas } from '@react-three/fiber'
import Lobby from './Lobby'
import { AvatarCreator } from '@readyplayerme/react-avatar-creator'
import { useState } from 'react'
import { insertCoin, myPlayer } from 'playroomkit'
import { generateRandomHexColor, getRandomExpression, getStoreValue } from './utils/helpers'
import OpenMapExperience from './components/OpenMapExperience'
import { UI } from './components/UI/UI'
import { Loading } from './components/UI/Loading'
import { Physics } from '@react-three/rapier' // Import Physics component

export default function App() {
  const [avatarMode, setAvatarMode] = useState(false)
  const [gameLaunched, setGameLaunched] = useState(false)
  const [experienceReady, setExperienceReady] = useState(false)

  if (!avatarMode && !gameLaunched) {
    return (
      <Lobby
        onJoinOrCreateRoom={roomCode => {
          setAvatarMode(true)
        }}
      />
    )
  } else if (!gameLaunched && avatarMode) {
    return (
      <AvatarCreator
        subdomain='playroom'
        className='fixed top-0 left-0 z-10 w-screen h-screen'
        onAvatarExported={event => {
          const avatarUrl = event.data.url
          const avatarImage = `https://models.readyplayer.me/${event.data.avatarId}.png?expression=${getRandomExpression()}&size=512`

          insertCoin({
            skipLobby: true,
          }).then(() => {
            myPlayer().setState('character', {
              id: myPlayer().id,
              hairColor: generateRandomHexColor(),
              topColor: generateRandomHexColor(),
              bottomColor: generateRandomHexColor(),
              avatarUrl: avatarUrl.split('?')[0] + '?' + new Date().getTime() + '&meshLod=2',
              avatarImg: avatarImage,
            })

            myPlayer().setState('player_name', getStoreValue('player_name'))
            setAvatarMode(false)
            setGameLaunched(true)
          })
        }}
      />
    )
  } else if (gameLaunched) {
    return (
      <>
        <Loading show={!experienceReady} />
        <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
          {/* <color attach='background' args={['#ececec']} /> */}
          <Physics>
            <OpenMapExperience onReady={setExperienceReady} />
          </Physics>
        </Canvas>
        {experienceReady && <UI />}
      </>
    )
  }
}
