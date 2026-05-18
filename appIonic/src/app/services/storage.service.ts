import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

/**
 * Wrapper Singleton sobre `@ionic/storage-angular`.
 *
 * Encapsula `Storage.create()` y expone una API mínima
 * (`set` / `get` / `remove` / `clear`) para que el resto de la
 * aplicación no dependa directamente de la API de la librería.
 *
 * El constructor dispara `init()` automáticamente para que el primer
 * `get` o `set` ya encuentre el motor disponible. Toda operación
 * pasa por `ensureReady()` para evitar carreras durante el arranque.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  /** Instancia interna creada por `storage.create()`. */
  private _storage: Storage | null = null;
  /** Promesa de inicialización compartida — evita `create()` múltiples. */
  private readyPromise: Promise<void>;

  constructor(private storage: Storage) {
    this.readyPromise = this.init();
  }

  /**
   * Crea el driver concreto (IndexedDB en navegador, SQLite en nativo).
   * Idempotente: solo se ejecuta una vez por instancia.
   * @returns Promesa que resuelve cuando el storage está listo.
   */
  private async init(): Promise<void> {
    const created = await this.storage.create();
    this._storage = created;
  }

  /**
   * Espera a que el storage esté listo antes de cualquier operación.
   * @returns Promesa que resuelve cuando `_storage` es usable.
   */
  private async ensureReady(): Promise<void> {
    if (!this._storage) {
      await this.readyPromise;
    }
  }

  /**
   * Persiste un valor bajo la clave indicada. Sobrescribe si ya existe.
   * @param key Clave única de almacenamiento.
   * @param value Valor a serializar (objetos, arrays, primitivos).
   * @returns Promesa que resuelve cuando el valor se ha escrito.
   */
  async set(key: string, value: unknown): Promise<void> {
    await this.ensureReady();
    await this._storage!.set(key, value);
  }

  /**
   * Recupera el valor asociado a una clave.
   * @param key Clave de búsqueda.
   * @returns Valor tipado como `T` o `null` si la clave no existe.
   */
  async get<T = unknown>(key: string): Promise<T | null> {
    await this.ensureReady();
    const value = await this._storage!.get(key);
    return (value ?? null) as T | null;
  }

  /**
   * Elimina el valor asociado a una clave.
   * @param key Clave a borrar.
   * @returns Promesa que resuelve cuando la clave ya no existe.
   */
  async remove(key: string): Promise<void> {
    await this.ensureReady();
    await this._storage!.remove(key);
  }

  /**
   * Vacía completamente el almacenamiento.
   * @returns Promesa que resuelve cuando el storage queda vacío.
   */
  async clear(): Promise<void> {
    await this.ensureReady();
    await this._storage!.clear();
  }
}
