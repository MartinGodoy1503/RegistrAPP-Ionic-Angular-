import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite, private platform: Platform, private storage: Storage) {
    this.initializeDatabase();
  }

  // FUNCIÓN PARA CREAR LAS TABLAS
  async createTables() {
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql(`
          CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT,
          password TEXT,
          rol TEXT
        );
        CREATE TABLE IF NOT EXISTS sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER,
          active INTEGER,
          FOREIGN KEY(userId) REFERENCES users(id)
        );
        CREATE TABLE IF NOT EXISTS attendance (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          studentId INTEGER,
          classId INTEGER,
          date TEXT,
          FOREIGN KEY(studentId) REFERENCES users(id)
        );
        `, 
        []);
        console.log('Tablas creadas exitosamente');
      } catch (error) {
        console.error('Error al crear las tablas', error);
      }
    }
  }

  // FUNCION QUE SETEA UN OBJETO SQLiteObject
  async initializeDatabase() { 
    try {
      await this.platform.ready();
      this.dbInstance = await this.sqlite.create({
        name: 'registrapp.db',
        location: 'default'
      });
      console.log('Base de datos inicializada');
      await this.createTables();
    } catch (error) {
      console.error('Error al inicializar la base de datos', error);
    }
  }

  // FUNCION QUE CONSULTA SI EXISTE UNA SESION QUE ESTÉ ACTIVA
  async checkActiveSession(): Promise<boolean> {
    if (this.dbInstance) {
      try {
        const result = await this.dbInstance.executeSql('SELECT * FROM sessions WHERE active = 1', []);
        return result.rows.length > 0;
      } catch (error) {
        console.error('Error al verificar la sesión activa', error);
        return false;
      }
    }
    return false;
  }

  // FUNCION QUE VALIDA LA EXISTENCIA DEL USUARIO
  async validateUser(username: string, password: string): Promise<boolean> {
    if (this.dbInstance) {
      try {
        const result = await this.dbInstance.executeSql('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        return result.rows.length > 0;
      } catch (error) {
        console.error('Error al validar el usuario', error);
        return false;
      }
    }
    return false;
  }

  // FUNCION QUE PERMITE REGISTRAR LA SESION
  async registerSession(userId: number): Promise<void> {
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql('INSERT INTO sessions (userId, active) VALUES (?, 1)', [userId]);
        console.log('Sesión registrada exitosamente');
      } catch (error) {
        console.error('Error al registrar la sesión', error);
      }
    }
  }  
  
  // FUNCION QUE ACTUALIZA EL ESTADO "ACTIVE" DE LA SESIÓN
  async updateSessionStatus(userId: number, active: number): Promise<void> {
    if (this.dbInstance) {
      try {
        await this.dbInstance.executeSql('UPDATE sessions SET active = ? WHERE userId = ?', [active, userId]);
        console.log('Estado de sesión actualizado');
      } catch (error) {
        console.error('Error al actualizar el estado de sesión', error);
      }
    }
  }

  // FUNCION PARA REGISTAR LA ASISTENCIA
  async registerAttendance(studentId: number, classId: number): Promise<void> {
    if (this.dbInstance) {
      const date = new Date().toISOString(); //FECHA FORMATO ISO 
      try {
        await this.dbInstance.executeSql('INSERT INTO attendance (studentId, classId, date) VALUES (?, ?, ?)', [studentId, classId, date]);
        console.log('Asistencia registrada exitosamente');
      } catch (error) {
        console.error('Error al registrar la asistencia', error);
      }
    }
  }

  // FUNCION PARA OBTENER LA ASISTENCIA POR ALUMNO
  async getAttendanceByStudent(studentId: number): Promise<any[]> {
    if (this.dbInstance) {
      try {
        const result = await this.dbInstance.executeSql('SELECT * FROM attendance WHERE studentId = ?', [studentId]);
        const attendanceRecords = [];
        for (let i = 0; i < result.rows.length; i++) {
          attendanceRecords.push(result.rows.item(i));
        }
        return attendanceRecords;
      } catch (error) {
        console.error('Error al obtener las asistencias', error);
        return [];
      }
    }
    return [];
  }

  async insertTestData() {
    if (this.dbInstance) {
      try {
        // DATOS DE PRUEBA EN LA BD
        await this.dbInstance.executeSql(
          `INSERT INTO users (username, password, role) VALUES ('profesor1', '1234', 'profesor');`,
          []
        );
        await this.dbInstance.executeSql(
          `INSERT INTO users (username, password, role) VALUES ('alumno1', '1234', 'alumno');`,
          []
        );
        await this.dbInstance.executeSql(
          `INSERT INTO users (username, password, role) VALUES ('alumno2', '1234', 'alumno');`,
          []
        );

        await this.dbInstance.executeSql(
          `INSERT INTO attendance (studentId, classId, date) VALUES (2, 101, '2024-09-28');`,
          []
        );
        await this.dbInstance.executeSql(
          `INSERT INTO attendance (studentId, classId, date) VALUES (3, 101, '2024-09-28');`,
          []
        );

        console.log('Datos de prueba insertados exitosamente');
      } catch (error) {
        console.error('Error al insertar datos de prueba', error);
      }
    }
  }

  async registerUser(username: string, email: string, password: string): Promise<void> {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await this.dbInstance?.executeSql(sql, [username, email, password]);
  }

  async getUser(username: string, password: string) {
    const sql = `SELECT * FROM usuarios WHERE username = ? AND password = ?`;
    const res = await this.dbInstance?.executeSql(sql, [username, password]);

    return res.rows.length > 0 ? res.rows.item(0) : null;
  }

  async userExists(username: string) {
    const sql = `SELECT * FROM usuarios WHERE username = ?`;
    const res = await this.dbInstance?.executeSql(sql, [username]);

    return res.rows.length > 0;
  }
    
}