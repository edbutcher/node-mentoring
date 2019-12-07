const showMemoryUsage = () => setInterval(() => {
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024
  console.log(`Used ${Math.round(memoryUsed * 100) / 100} Mb of RAM`)
}, 200)

module.exports = showMemoryUsage;
