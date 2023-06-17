# My Vue/Vite starter for making silly websites

Using vue3 and vite of course. Configured CSS with tailwind and headlessUI.

I set the port to 3000.

Run with this, hot reload is enabled:
```bash
npm run dev
```

In the package.json I changed the build command to work with vercel.

## Architecture

### Assets
Pictures and other assets go in the assets folder.

### Components
Vue components go in the components folder. You want these to be as small as possible, reusable, and stateless.

### Pages
Pages are the main components that make up the site. They are the main components that are rendered in the App.vue file. Fill them with components or random html.

### Router
The router is configured in the router.ts file. It is a simple router that uses the pages folder to render the pages.
Every time you add a new page, you need to add it to the router.

### Stores
The stores folder is where you put your Pinia stores. It's fairly straightforward.
If you have a backend, you might want to create a single file with classes containing all the routes to the backend. Or call the backend from within each store it's fine.

### Types
The types folder is where you put your typescript types.

The index.css has some tailwind config in there. I've imported a font that I like.

Any extensions would probably go in main.ts file (pinia for example).

In the vite.config.ts I commented out some config to make a proxy to a backend.

