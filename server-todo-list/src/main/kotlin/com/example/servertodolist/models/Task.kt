package com.example.servertodolist.models

import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.springframework.boot.autoconfigure.SpringBootApplication
import java.time.LocalDateTime

@Entity
@Table(name = "database_task")
data class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var title: String = "",

    var content: String = "",

    var completed: Boolean = false,

    @Enumerated(EnumType.STRING)
    var importance: TaskImportance = TaskImportance.Low,

    val dateCreation: LocalDateTime = LocalDateTime.now()
)