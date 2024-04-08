const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the hidden class from the install button container
    butInstall.classList.toggle('hidden', false);
  });


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) return;
  // Show the install prompt
  promptEvent.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  // We no longer need the prompt. Clear it up.
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
  console.log('PWA was installed', event);
});