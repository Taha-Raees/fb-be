const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// This function will be called to start the clock update process
async function startClockUpdate() {
  console.log('Clock updater started.');

  async function updateClock() {
    try {
      const clockId = 1; // Adjust based on your setup
      await prisma.clock.update({
        where: { id: clockId },
        data: { timestamp: new Date() },
      });
      console.log(`Clock updated: ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`Failed to update clock: ${error.message}`);
    }
  }

  // Update the clock every second
  setInterval(updateClock, 1*60*1000);
}

module.exports = { startClockUpdate };
