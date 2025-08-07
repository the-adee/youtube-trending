import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const WelcomeModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome note before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeNote')
    if (!hasSeenWelcome) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('hasSeenWelcomeNote', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            A Quick Note
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close welcome note"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              I always found the YouTube Trending page helpful — not necessarily to watch all the videos, 
              but to quickly see what people were talking about. It gave a sense of what was gaining 
              attention — whether it was news, music, or just something unexpected going viral.
            </p>
            
            <p>
              When YouTube removed the Trending tab from both the app and the website, that small window 
              into current conversations disappeared. So I decided to build something that brings it back — 
              not to criticize YouTube's decisions (which I respect), but simply because it added value 
              to how I use the platform.
            </p>
            
            <p>
              And that's the beauty of being a developer — you can create things that you wish still 
              existed, and maybe others were wishing for too. Sometimes, a simple tool can make a 
              difference — not just for you, but for anyone who shares the same need.
            </p>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeModal
