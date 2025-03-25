import time

# Yatırım seçenekleri (Her seçenek için minimum yatırım tutarı eklendi)
investment_options = [
    {"name": "Hisse Senetleri", "risk": 8, "min_vade": 6, "max_vade": 10, "expected_yield": 18, "min_investment": 1000},
    {"name": "Tahviller", "risk": 3, "min_vade": 3, "max_vade": 6, "expected_yield": 7, "min_investment": 500},
    {"name": "Gayrimenkul", "risk": 5, "min_vade": 7, "max_vade": 10, "expected_yield": 10, "min_investment": 50000},
    {"name": "Altın ve Diğer Değerli Metaller", "risk": 4, "min_vade": 4, "max_vade": 8, "expected_yield": 6, "min_investment": 1000},
    {"name": "Döviz", "risk": 6, "min_vade": 2, "max_vade": 5, "expected_yield": 8, "min_investment": 100},
    {"name": "Kripto Paralar", "risk": 10, "min_vade": 1, "max_vade": 10, "expected_yield": 25, "min_investment": 100},
    {"name": "Yatırım Fonları", "risk": 4, "min_vade": 4, "max_vade": 9, "expected_yield": 10, "min_investment": 500},
    {"name": "Vadeli İşlemler (Futures)", "risk": 9, "min_vade": 1, "max_vade": 3, "expected_yield": 28, "min_investment": 100},
    {"name": "Emtia Yatırımları", "risk": 6, "min_vade": 4, "max_vade": 8, "expected_yield": 12, "min_investment": 1000},
    {"name": "Mevduat ve Vadeli Hesaplar", "risk": 1, "min_vade": 1, "max_vade": 3, "expected_yield": 4, "min_investment": 100}
]

# Varsayılan parametreler
default_total_money = 150000
default_risk_tolerance = 9
default_vade = 9

step = 1
TIME_LIMIT_DFS = 5  # Botun düşünme süresi (saniye)
depth_limit = 25

def is_feasible(allocation, options, risk_tolerance, user_vade, total_money):
    if sum(allocation) != 100:
        return False
    weighted_risk = sum(alloc * opt["risk"] for alloc, opt in zip(allocation, options)) / 100.0
    weighted_min = sum(alloc * opt["min_vade"] for alloc, opt in zip(allocation, options)) / 100.0
    weighted_max = sum(alloc * opt["max_vade"] for alloc, opt in zip(allocation, options)) / 100.0
    if not ((weighted_risk <= risk_tolerance) and (weighted_min <= user_vade <= weighted_max)):
        return False
    # Her seçenek için, eğer yatırım yapılacaksa (yüzde > 0) tahsis edilen para, minimum gereksinimi karşılamalı
    for alloc, opt in zip(allocation, options):
        if alloc > 0:
            allocated_amount = total_money * (alloc / 100.0)
            if allocated_amount < opt.get("min_investment", 0):
                return False
    return True

def calculate_total_yield(allocation, options):
    return sum(alloc * opt["expected_yield"] for alloc, opt in zip(allocation, options)) / 100.0

def dfs_optimize(options, step, time_limit, risk_tolerance, user_vade, depth_limit, total_money):
    best_allocation, best_yield = None, -float('inf')
    start_time = time.time()
    n = len(options)

    def dfs(index, current_alloc, total_alloc, current_depth):
        nonlocal best_allocation, best_yield
        if time.time() - start_time > time_limit:
            return
        if index == n:
            if total_alloc == 100 and is_feasible(current_alloc, options, risk_tolerance, user_vade, total_money):
                current_yield = calculate_total_yield(current_alloc, options)
                if current_yield > best_yield:
                    best_yield = current_yield
                    best_allocation = current_alloc
            return
        if current_depth >= depth_limit:
            allocation = current_alloc + [100 - total_alloc] + [0] * (n - index - 1)
            if sum(allocation) == 100 and is_feasible(allocation, options, risk_tolerance, user_vade, total_money):
                current_yield = calculate_total_yield(allocation, options)
                if current_yield > best_yield:
                    best_yield = current_yield
                    best_allocation = allocation
            return
        for p in range(0, 100 - total_alloc + 1, step):
            dfs(index + 1, current_alloc + [p], total_alloc + p, current_depth + 1)

    dfs(0, [], 0, 0)
    return best_allocation, best_yield

# run_all_optimizations artık 4 parametre alacak şekilde güncellendi:
def run_all_optimizations(total_money, risk_tolerance, user_vade, time_limit_dfs):
    dfs_alloc, dfs_yld = dfs_optimize(
        investment_options, step, time_limit_dfs, risk_tolerance, user_vade, depth_limit, total_money
    )
    return {"Limited DFS": (dfs_alloc, dfs_yld)}
