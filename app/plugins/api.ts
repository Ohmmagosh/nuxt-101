export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: `${import.meta.env.VITE_API_URL}`,
    });
    return {
      provide: {
        api,
      },
    };
  },
});
