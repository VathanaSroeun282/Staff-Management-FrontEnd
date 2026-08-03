<template>
  <div v-if="loading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>

  <div v-else class="p-6">
    <h1 class="text-2xl font-bold mb-4">Attendance List</h1>

    <router-link
      to="/attendance/create"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add Attendance
    </router-link>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Clock In</th>
          <th class="border px-4 py-2">Clock Out</th>
          <th class="border px-4 py-2">Employee</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="attendances.length === 0">
          <td colspan="5" class="text-center py-4">No attendances found</td>
        </tr>

        <tr v-for="attendance in attendances" :key="attendance.attendanceID">
          <td class="border px-4 py-2">{{ attendance.attendanceID }}</td>
          <td class="border px-4 py-2">{{ formatTime(attendance.clockInTime) }}</td>
          <td class="border px-4 py-2">{{ formatTime(attendance.clockOutTime) }}</td>
          <td class="border px-4 py-2">{{ attendance.employeeName }}</td>
          <td class="border px-4 py-2">
            <router-link
              :to="{ name:'attendance-edit' ,params:{ id: attendance.attendanceID } }"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>

            <button
              @click="deleteAttendance(attendance.attendanceID)"
              class="text-red-600 ml-4"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import axios from 'axios'
import type { Attandance } from '@/types/Attendance'
import { AttendanceAPI } from '@/end points/EndPointLinks'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const attendances = ref<Attandance[]>([])

    const loadAttendance = async () => {
      loading.value = true
      try {
        const res = await axios.get<Attandance[]>(AttendanceAPI)
        attendances.value = res.data
      } finally {
        loading.value = false
      }
    }

    const deleteAttendance = async (id: number) => {
      if (!confirm('Are you sure you want to delete this attendance?')) return

      try {
        await axios.delete(`${AttendanceAPI}/${id}`)

        // 🔥 instant update (no reload)
        attendances.value = attendances.value.filter(a => a.attendanceID !== id)

      } catch (error) {
        console.error(error)
        alert('Delete failed')
      }
    }

    // 🔥 format datetime -> HH:mm
    const formatTime = (datetime: string) => {
      return datetime?.slice(11, 16)
    }

    onMounted(() => {
      loadAttendance()
    })

    return {
      attendances,
      deleteAttendance,
      loading,
      formatTime
    }
  },
})
</script>