
async function registerServiceWorker() {
  try {
    const reg = await navigator.serviceWorker.register('./../service-worker.js')
    console.log(`registered service-worker: scope is ${reg.scope}`)
  } catch (err) {
    console.error(`failed to register service-worker: ${err.message}`)
  }
}

/**
 * Run the client-side code
 */
async function main() {
  await registerServiceWorker()
}

main()
