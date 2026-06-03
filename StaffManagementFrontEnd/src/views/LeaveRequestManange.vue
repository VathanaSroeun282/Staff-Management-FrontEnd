<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Leave Request Management</h1>
    <router-link
      to="/auditLogs/create"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add Leave Request
    </router-link>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Leave Type</th>
          <th class="border px-4 py-2">Start Date</th>
          <th class="border px-4 py-2">End Date</th>
          <th class="border px-4 py-2">Reason</th>
          <th class="border px-4 py-2">Employee Name</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="leaveRequest.length === 0">
          <td colspan="5" class="text-center py-4">No Leave Request found</td>
        </tr>

        <tr v-for="leaveR in leaveRequest" :key="leaveR.leaveRequestID">
          <td class="border px-4 py-2">{{ leaveR.leaveRequestID }}</td>
          <td class="border px-4 py-2">{{ leaveR.leaveType }}</td>
          <td class="border px-4 py-2">{{ formatTime(leaveR.startDate) }}</td>
          <td class="border px-4 py-2">{{ formatTime(leaveR.endDate) }}</td>
          <td class="border px-4 py-2">{{ leaveR.reason }}</td>
          <td class="border px-4 py-2">{{ leaveR.employeeName }}</td>
          <td class="border px-4 py-2"> 
            <router-link
              :to="{name:'audit-log-edit',params:{id: leaveR.leaveRequestID}}"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>

            <button
              @click="deleteLeaveRequest(leaveR.leaveRequestID)"
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
import type { LeaveRequest } from '@/types/LeaveRequest';
import { LeaveRequestAPI } from '@/end points/EndPointLinks'
export default defineComponent({
  setup() {
    const loading = ref(false)
    const leaveRequest = ref<LeaveRequest[]>([])
    const loadAuditLog = async () => {
      loading.value = true
      try {
        const res = await axios.get<LeaveRequest[]>(LeaveRequestAPI)
        leaveRequest.value = res.data
      } finally {
        loading.value = false
      }
    }
    const deleteLeaveRequest = async (id: number) => {
      if (!confirm('Are you sure you want to delete this auditlog?')) return

      try {
        await axios.delete(`${LeaveRequestAPI}/${id}`)

        // 🔥 instant update (no reload)
        leaveRequest.value = leaveRequest.value.filter(a => a.leaveRequestID !== id)

      } catch (error) {
        console.error(error)
        alert('Delete failed')
      }
    }

    // 🔥 format datetime -> HH:mm
    const formatTime = (datetime: string) => {
      //return datetime?.split("T")[0]
      const date = new Date(datetime)

      const day = String(date.getDate()).padStart(2, '0')

      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]

      const month = months[date.getMonth()]
      const year = date.getFullYear()

      return `${day}-${month}-${year}`
    }

    onMounted(() => {
      loadAuditLog()
    })

    return {
      leaveRequest,
      deleteLeaveRequest,
      loading,
      formatTime,

    }
  },
})
</script>