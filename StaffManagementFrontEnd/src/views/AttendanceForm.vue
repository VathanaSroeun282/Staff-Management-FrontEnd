<template>
  <div class="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-xl mt-8">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEdit ? 'Edit Attendance' : 'Create Attendance' }}
    </h1>

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block font-medium mb-1">Clock Time In</label>
        <input v-model="attendance.clockInTime" type="time" class="w-full border rounded px-3 py-2" required />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">Clock Time Out</label>
        <input v-model="attendance.clockOutTime" type="time" class="w-full border rounded px-3 py-2" required />
      </div>

      <div class="mb-4">
        <label class="block font-medium mb-1">Employee ID</label>
        <input v-model="attendance.employeeID" type="number" class="w-full border rounded px-3 py-2" required />
      </div>

      <div class="mt-6 flex justify-between">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {{ isEdit ? 'Update' : 'Create' }}
        </button>

        <router-link to="/attendances" class="text-gray-600 hover:underline">
          Cancel
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import type { Attandance } from '@/types/Attendance'
import { AttendanceAPI } from '@/end points/EndPointLinks'

export default defineComponent({
  setup() {
    const attendance = ref<Attandance>({
      attendanceID: 0,
      clockInTime: "",
      clockOutTime: "",
      employeeID: 0,
      employeeName: ""
    })

    const isEdit = ref(false)
    const route = useRoute()
    const router = useRouter()

    // 🔥 convert time -> datetime
    const formatToDateTime = (time: string) => {
      const today = new Date().toISOString().split('T')[0]
      return `${today}T${time}:00`
    }

    const fetchAttendance = async (id: number) => {
      const res = await axios.get<Attandance>(`${AttendanceAPI}/${id}`)

      attendance.value = {
        ...res.data,
        clockInTime: res.data.clockInTime.slice(11, 16),
        clockOutTime: res.data.clockOutTime.slice(11, 16)
      }
    }

    const handleSubmit = async () => {
      try {
        if (isEdit.value) {
          await axios.put(`${AttendanceAPI}/${attendance.value.attendanceID}`, {
            clockInTime: formatToDateTime(attendance.value.clockInTime),
            clockOutTime: formatToDateTime(attendance.value.clockOutTime)
          })
        } else {
          await axios.post(AttendanceAPI, {
            clockInTime: formatToDateTime(attendance.value.clockInTime),
            clockOutTime: formatToDateTime(attendance.value.clockOutTime),
            employeeID: attendance.value.employeeID
          })
        }

        router.push('/attendances')
      } catch (err) {
        console.error(err)
        alert('Error occurred.')
      }
    }

    onMounted(() => {
      const id = Number(route.params.id)
      if (id) {
        isEdit.value = true
        fetchAttendance(id)
      }
    })

    return {
      attendance,
      isEdit,
      handleSubmit,
    }
  },
})
</script>