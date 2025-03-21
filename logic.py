# logic.py

import time
import random
import math
from collections import deque
import firebase_admin
from firebase_admin import credentials, firestore

# Firebase'i başlat
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def save_results_to_firebase(results):
    doc_ref = db.collection("investment_recommendations").document()
    doc_ref.set(results)
    print("Sonuçlar Firebase'e kaydedildi.")

# Yatırım Seçenekleri
investment_options = [
    {"name": "Hisse Senetleri", "risk": 8, "min_vade": 6, "max_vade": 10, "expected_yield": 18},
    {"name": "Tahviller", "risk": 3, "min_vade": 3, "max_vade": 6, "expected_yield": 7},
    # ... diğer seçenekler ...
    {"name": "Mevduat ve Vadeli Hesaplar", "risk": 1, "min_vade": 1, "max_vade": 3, "expected_yield": 4}
]

# Varsayılan parametreler (Backend için sabit değerler yerine form verilerinden gelecek)
default_total_money = 150000
default_risk_tolerance = 9
default_vade = 9

step = 1

# Zaman sınırları ve diğer sabitler
TIME_LIMIT_DFS = 300
depth_limit = 15

# Fonksiyonlar: is_feasible, calculate_total_yield, calculate_weighted_vade, random_allocation, dfs_optimize, bfs_optimize, ga_optimize, pso_optimize, multi_beam_optimize, simulated_annealing_optimize
# (Not: Kodunuzun tamamını buraya kopyalayın, “print” komutlarını kaldırıp sonuçları döndüren fonksiyonlar haline getirin.)

def is_feasible(allocation, options, risk_tolerance, user_vade):
    if sum(allocation) != 100:
        return False
    weighted_risk = sum(alloc * opt["risk"] for alloc, opt in zip(allocation, options)) / 100.0
    weighted_min = sum(alloc * opt["min_vade"] for alloc, opt in zip(allocation, options)) / 100.0
    weighted_max = sum(alloc * opt["max_vade"] for alloc, opt in zip(allocation, options)) / 100.0
    return (weighted_risk <= risk_tolerance) and (weighted_min <= user_vade <= weighted_max)

def calculate_total_yield(allocation, options):
    yield_sum = sum(alloc * opt["expected_yield"] for alloc, opt in zip(allocation, options))
    return yield_sum / 100.0

def calculate_weighted_vade(allocation, options):
    weighted_vade = sum(alloc * ((opt["min_vade"] + opt["max_vade"]) / 2) for alloc, opt in zip(allocation, options)) / 100.0
    return weighted_vade

# Diğer fonksiyonlarınızı (dfs_optimize, bfs_optimize, ga_optimize, pso_optimize, multi_beam_optimize, simulated_annealing_optimize) ekleyin...
# Örneğin:
def dfs_optimize(options, step, time_limit, risk_tolerance, user_vade, depth_limit):
    best_allocation = None
    best_yield = -float('inf')
    start_time = time.time()
    n = len(options)
    
    def dfs(index, current_alloc, total_alloc, current_depth):
        nonlocal best_allocation, best_yield
        if time.time() - start_time > time_limit:
            return
        if index == n:
            if total_alloc == 100 and is_feasible(current_alloc, options, risk_tolerance, user_vade):
                current_yield = calculate_total_yield(current_alloc, options)
                if current_yield > best_yield:
                    best_yield = current_yield
                    best_allocation = current_alloc
            return
        if current_depth >= depth_limit:
            allocation = current_alloc + [100 - total_alloc] + [0] * (n - index - 1)
            if sum(allocation) == 100 and is_feasible(allocation, options, risk_tolerance, user_vade):
                current_yield = calculate_total_yield(allocation, options)
                if current_yield > best_yield:
                    best_yield = current_yield
                    best_allocation = allocation
            return
        for p in range(0, 100 - total_alloc + 1, step):
            dfs(index + 1, current_alloc + [p], total_alloc + p, current_depth + 1)
    
    dfs(0, [], 0, 0)
    return best_allocation, best_yield

def run_all_optimizations(total_money, risk_tolerance, user_vade):
    dfs_alloc, dfs_yld = dfs_optimize(investment_options, step, TIME_LIMIT_DFS, risk_tolerance, user_vade, depth_limit)
    results = {
        "Limited DFS": (dfs_alloc, dfs_yld)
    }
    save_results_to_firebase(results)  # Firebase'e kaydet
    return results
