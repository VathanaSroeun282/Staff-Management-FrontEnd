<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>
  <div v-else class="p-6">
    <h1 class="text-2xl font-bold mb-4">Leave Request Management</h1>
    <router-link
      to="/Performance/create"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block font-semibold"
    >
      Create New Performance Review
    </router-link>

    <table class="table-auto w-full border">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Review Date</th>
          <th class="border px-4 py-2">Rating</th>
          <th class="border px-4 py-2 text-left">Comment</th>
          <th class="border px-4 py-2 text-left">Employee Name</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="performanceReviews.length === 0">
          <td colspan="5" class="text-center py-4">No Leave Request found</td>
        </tr>

        <tr v-for="performanceReview in performanceReviews" :key="performanceReview.reviewID" class="text-center">
          <td class="border px-4 py-2">{{ performanceReview.reviewID }}</td>
          <td class="border px-4 py-2">{{ formatTime(performanceReview.reviewDate) }}</td>
          <td class="border px-4 py-2">{{ performanceReview.rating }}</td>
          <td class="border px-4 py-2 text-left">{{ performanceReview.comments }}</td>
          <td class="border px-4 py-2 text-left">{{ performanceReview.employeeName }}</td>
          <td class="border px-4 py-2"> 
            <router-link
              :to="{ name:'performance-edit',params:{id: performanceReview.reviewID}}"
              class="text-blue-600 hover:underline"
            >
              Edit
            </router-link>

            <button
              @click="deletePerformanceReview(performanceReview.reviewID)"
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
import type { PerformanceReview } from '@/types/PerformanceReview';
import { PerformanceReviewAPI } from '@/end points/EndPointLinks';
export default defineComponent({
  setup() {
    const isLoading = ref(false)
    const performanceReviews = ref<PerformanceReview[]>([])
    const loadingPerformanceReview = async () => {
      isLoading.value = true
      try {
        const res = await axios.get<PerformanceReview[]>(PerformanceReviewAPI)
        performanceReviews.value = res.data
      } finally {
        isLoading.value = false
      }
    }
    const deletePerformanceReview = async (id: number) => {
      if (!confirm('Are you sure you want to delete this Performance Review?')) return

      try {
        await axios.delete(`${PerformanceReviewAPI}/${id}`)

        // 🔥 instant update (no reload)
        performanceReviews.value = performanceReviews.value.filter(a => a.reviewID !== id)

      } catch (error) {
        console.error(error)
        alert('Delete failed: ' + error)
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
      loadingPerformanceReview()
    })

    return {
      performanceReviews,
      deletePerformanceReview,
      isLoading,
      formatTime,
    }
  },
})
</script>