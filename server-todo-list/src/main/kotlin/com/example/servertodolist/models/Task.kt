package com.example.servertodolist.models

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDate
import java.time.LocalDateTime

@Entity
@Table(name = "table_task")
data class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    var title: String = "",

    var content: String = "",

    var completed: Boolean = false,

    @Enumerated(EnumType.STRING)
    var importance: TaskImportance = TaskImportance.Low,

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    var dateCreation: LocalDateTime? = null,

    var dueDate: LocalDate,
)
