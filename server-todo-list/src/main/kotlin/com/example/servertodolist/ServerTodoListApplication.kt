package com.example.servertodolist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ServerTodoListApplication

fun main(args: Array<String>) {
    runApplication<ServerTodoListApplication>(*args)
}
