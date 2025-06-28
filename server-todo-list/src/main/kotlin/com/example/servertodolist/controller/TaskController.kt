package com.example.servertodolist.controller
import com.example.servertodolist.models.Task
import com.example.servertodolist.repository.TaskRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = ["http://localhost:4200"])
class TaskController(private val repository: TaskRepository) {

    @GetMapping
    fun getAllTasks(): List<Task> = repository.findAll()

    @PostMapping
    fun createTask(@RequestBody task: Task): Task = repository.save(task)

    @DeleteMapping("/{id}")
    fun deleteTask(@PathVariable id: Long) = repository.deleteById(id)

    @PutMapping("/{id}/complete")
    fun completeTask(@PathVariable id: Long): ResponseEntity<Task> {
        val task = repository.findById(id).orElse(null) ?: return ResponseEntity.notFound().build()
        task.completed = true
        return ResponseEntity.ok(repository.save(task))
    }

    @PutMapping("/{id}/uncomplete")
    fun uncompleteTask(@PathVariable id: Long): ResponseEntity<Task> {
        val task = repository.findById(id).orElse(null) ?: return ResponseEntity.notFound().build()
        task.completed = false
        return ResponseEntity.ok(repository.save(task))
    }

    @PutMapping("/{id}")
    fun updateTask(@PathVariable id: Long, @RequestBody updated: Task): ResponseEntity<Task> {
        val existing = repository.findById(id).orElse(null) ?: return ResponseEntity.notFound().build()

        existing.title = updated.title
        existing.content = updated.content
        existing.importance = updated.importance
        existing.dueDate = updated.dueDate
        existing.completed = updated.completed

        return ResponseEntity.ok(repository.save(existing))
    }
}
