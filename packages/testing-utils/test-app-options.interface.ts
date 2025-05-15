import { INestApplication } from "@nestjs/common";
import { TestingModuleBuilder } from "@nestjs/testing";

/**
 * Options paramétrables par micro-service
 */
export interface TestAppOptions {
  /**
   * Variables d’env surchargées
   */
  env?: Record<string, string>;
  /**
   * Hook pour ajouter / override des providers.
   */
  override?: (builder: TestingModuleBuilder) => TestingModuleBuilder;
  /**
   * Callback de nettoyage spécifique (truncate DB, flush Redis…)
   */
  clearDatabase?: (app: INestApplication) => Promise<void>;
}
