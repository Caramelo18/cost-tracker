repositories {
    mavenCentral()
}

plugins {
    java
    idea
    id("org.springframework.boot") version "2.2.0.RELEASE"
    id("io.spring.dependency-management") version "1.0.8.RELEASE"
}

dependencies {
    implementation ("org.springframework.boot:spring-boot-starter-web")
    implementation ("org.springframework.boot:spring-boot-devtools")
    implementation ("org.springframework.boot:spring-boot-starter-data-rest")
    implementation ("org.springframework.boot:spring-boot-starter-data-mongodb")
}
