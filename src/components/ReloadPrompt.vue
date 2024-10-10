<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// Handle service worker updates
const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  onRegisteredSW(swUrl) {
    console.log(`Service Worker at: ${swUrl}`)
  },
})

// New install-related properties and methods
const deferredPrompt = ref(null)
const canInstall = ref(false)

async function close() {
  offlineReady.value = false
  needRefresh.value = false
}

function handleBeforeInstallPrompt(event) {
  event.preventDefault()
  deferredPrompt.value = event
  canInstall.value = true
}

function installApp() {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      deferredPrompt.value = null
      canInstall.value = false
    })
  }
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})
</script>

<template>
  <div v-if="offlineReady || needRefresh || canInstall" class="pwa-toast" role="alert">
    <div class="message">
      <span v-if="offlineReady">
        App ready to work offline
      </span>
      <span v-else-if="canInstall">
        App is installable, click install to add to your home screen.
      </span>
      <span v-else>
        New content available, click on reload button to update.
      </span>
    </div>

    <!-- Show the install button if the app can be installed -->
    <button v-if="canInstall" @click="installApp">Install App</button>

    <!-- Show the reload button if a new service worker is available -->
    <button v-if="needRefresh" @click="updateServiceWorker()">Reload</button>

    <button @click="close">Close</button>
  </div>
</template>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0px #8885;
}

.pwa-toast .message {
  margin-bottom: 8px;
}

.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
